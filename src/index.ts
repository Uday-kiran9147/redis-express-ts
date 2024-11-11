import Redis from "ioredis";
import express from "express";
const app = express();

const PORT = 4000;
const USER_NAME = 'username'
const redis = new Redis();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

async function getData(req: express.Request, res: express.Response) {
    const user = req.params[`${USER_NAME}`];
    try {
        const response = await fetch(`https://api.github.com/users/${user}`);
        const { public_repos } = await response.json();
        const uploadString = `User ${req.params.username} has ${public_repos} public repositories`;
        const jsonData = JSON.stringify(uploadString);
        await redis.set(user, jsonData, 'EX', 3600);
        console.log('Data from the server');
        res.json({
            data: uploadString,
            source: 'server'
        });
    } catch (error) {
        console.log("Error: ", error);
    }

}
async function cache(req: express.Request, res: express.Response, next: express.NextFunction) {

    const user = req.params[USER_NAME];
    const data = await redis.get(user);
    if (data !== null) {
        console.log('Data from the cache');
        res.json({
            data: JSON.parse(data),
            source: 'cache'
        });
    } else {
        next();
    }

}
app.get(`/repos/:${USER_NAME}`, cache, getData);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;