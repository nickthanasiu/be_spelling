import express from "express";
import path from "path";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

// Serve the React static files after build
//app.use(express.static("./client/public"));
app.use('/static', express.static(path.join(__dirname, 'client', 'public')))

app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server listening on ${PORT}`);
});

app.get("/api/hello", (req, res) => {
    res.send({ message: "Hello" });
});

// All other unmatched requests will return the React app
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "public", "index.html"));
});