import { Redis } from '@upstash/redis'
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = 4000;
const USER_NAME = 'username'


const redis = new Redis(
    {
        url: process.env.REDIS_URL,
        token: process.env.SESSION_SECRET
    }
);

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
        await redis.set(user, jsonData);
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
            data: data,
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