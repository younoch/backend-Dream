import { Request, Response } from "express";
import QuoteListModel from "../models/QuoteListModel";

import type { IQuote  } from "../models";

const QuoteListControallar : any = {};

QuoteListControallar.addQuote = (req: Request, res: Response)=>{
    let reqBody = req.body;
    // replace(/[^a-z0-9]+/gi, "-").toLowerCase()
    const PostBody : IQuote = {
        quote: reqBody.quote,
        speaker: reqBody.speaker,
        lang: reqBody.lang,
        category_id: reqBody.category_id,
        slug: reqBody.quote.replace(/[^a-z0-9]+/gi, "-").toLowerCase(),
        created_at: new Date(Date.now()),
        updated_at: new Date(Date.now()),
        tags: reqBody.tags,
        comments: reqBody.comments
    };
    // let quote = reqBody.quote;
    // let TodoDescription = reqBody['TodoDescription'];
    // let UserName = req.headers['username'];
    // let TodoStatus = 'New';
    // let TodoCreateDate = Date.now();
    // let TodoUpdateDate = Date.now();


    
    QuoteListModel.create(PostBody, (err: any, data: any) => {
        if (err) {
            res.status(400).json({status: "fail", data: err})
        } else {
            res.status(200).json({status: "success", data: data})
        }
    })

}

QuoteListControallar.SelectTodo = (req: Request, res: Response)=>{

    let UserName = req.headers['username'];

    QuoteListModel.find({ UserName: UserName}, (err: any, data: any) => {
        if (err) {
            res.status(400).json({status: "fail", data: err})
        } else {
            res.status(200).json({status: "Success", data: data})
        }
    })
}

QuoteListControallar.UpdateTodo = (req: Request, res: Response)=>{
    let TodoSubject = req.body['TodoSubject'];
    let TodoDescription = req.body['TodoDescription'];
    let _id = req.body['_id'];
    let TodoUpdateDate = Date.now();

    let PostBody = {TodoSubject,TodoDescription, TodoUpdateDate}

    QuoteListModel.updateOne({ _id: _id }, { $set: PostBody }, {upsert: true}, (err: any, data: any) => {
        if (err) {
            res.status(400).json({status: "fail", data: err})
        } else {
            res.status(200).json({status: "Success", data: data})
        }
    })
}
QuoteListControallar.UpdateStatusTodo = (req: Request, res: Response)=>{
    let TodoStatus = req.body['TodoStatus'];
    let _id = req.body['_id'];
    let TodoUpdateDate = Date.now();

    let PostBody = {TodoStatus, TodoUpdateDate}

    QuoteListModel.updateOne({ _id: _id }, { $set: PostBody }, {upsert: true}, (err: any, data: any) => {
        if (err) {
            res.status(400).json({status: "fail", data: err})
        } else {
            res.status(200).json({status: "Success", data: data})
        }
    })
}
QuoteListControallar.RemoveTodo = (req: Request, res: Response)=>{
    let _id = req.body['_id'];

    QuoteListModel.deleteOne({ _id: _id }, (err: any, result: any) => {
        if (err) {
            res.status(400).json({status: "fail", data: err})
        } else {
            res.status(200).json({status: "Success", data: result})
        }
    })
}


QuoteListControallar.SelectTodoByStatus = (req :Request, res :Response)=>{

    // let UserName = req.headers['username'];
    let TodoStatus = req.body['TodoStatus'];

    QuoteListModel.find({ TodoStatus}, (err:any, data:any) => {
        if (err) {
            res.status(400).json({status: "fail", data: err})
        } else {
            res.status(200).json({status: "Success", data:data})
        }
    })
}
QuoteListControallar.SelectTodoByDate = (req :Request, res :Response)=>{

    let FormDate = req.body['FormDate'];
    let ToDate = req.body['ToDate'];

    QuoteListModel.find({ TodoCreateDate : {$gte : new Date(FormDate), $lte : new Date(ToDate)}}, (err:any, data:any) => {
        if (err) {
            res.status(400).json({status : "fail", data : err})
        } else {
            res.status(200).json({status : "Success", data :data})
        }
    })
}

export default QuoteListControallar
