// import dotenv from "dotenv";
// dotenv.config();
import { DBConnect } from "../dbConnect.js";
import category from "../models/category.js";
import question from "../models/question.js";

const seeder = async () => {
    const databaseUrl = "mongodb+srv://manuvaidik_db_user:dVgo8QsyRxw4T5xK@cluster0.iqsqxry.mongodb.net/?appName=Cluster0";
    await DBConnect(databaseUrl);
    try {
        const res = await fetch("https://test-data-gules.vercel.app/data.json");
        const data = await res.json();

        for (const sl of data.data) {
            const title = sl.title;
            const questions = await Promise.all(
                sl.ques.map(async (q) => {
                    return await question.create({ title: q.title, topic : title,url: q.p1_link });
                })
            );
            await category.create({
                title: title,
                questions: questions
            });
        }

        console.log("done");
        return;
    } catch (error) {
        console.log(error.message);
    }
};

seeder();