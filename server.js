const crypto = require("crypto");
const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

const sessions = new Map();
const SESSION_COOKIE = "sid";
const publicDir = path.join(__dirname, "public");

app.use(express.urlencoded({ extended: false }));

function parseCookies(cookieHeader = "") {
  return cookieHeader
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .reduce((acc, part) => {
      const [key, ...rest] = part.split("=");
      acc[key] = decodeURIComponent(rest.join("="));
      return acc;
    }, {});
}

function getSession(req) {
  const sid = parseCookies(req.headers.cookie)[SESSION_COOKIE];
  return sid ? sessions.get(sid) || null : null;
}

function createSession(username) {
  const sid = crypto.randomUUID();
  sessions.set(sid, { username, createdAt: Date.now() });
  return sid;
}

function destroySession(req) {
  const sid = parseCookies(req.headers.cookie)[SESSION_COOKIE];
  if (sid) sessions.delete(sid);
}

function requireAuth(req, res, next) {
  const session = getSession(req);
  if (!session) {
    return res.redirect("/?error=auth");
  }
  req.session = session;
  next();
}

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "password") {
    const sid = createSession(username);
    res.setHeader(
      "Set-Cookie",
      `${SESSION_COOKIE}=${encodeURIComponent(sid)}; HttpOnly; Path=/; SameSite=Lax`
    );
    return res.redirect("/admin");
  }

  res.redirect("/?error=invalid");
});

app.post("/logout", (req, res) => {
  destroySession(req);
  res.setHeader(
    "Set-Cookie",
    `${SESSION_COOKIE}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`
  );
  res.redirect("/?logged_out=1");
});

const adminRouter = express.Router();

adminRouter.use(requireAuth);

adminRouter.get("/", (req, res) => {
  res.sendFile(path.join(publicDir, "admin.html"));
});

adminRouter.get("/session", (req, res) => {
  res.json({
    authenticated: true,
    username: req.session.username,
    createdAt: req.session.createdAt,
  });
});

app.use("/admin", adminRouter);

// Prevent direct access to the raw static file path; force the protected route.
app.get("/admin.html", (_req, res) => {
  res.redirect("/admin");
});

app.use(express.static(publicDir));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
