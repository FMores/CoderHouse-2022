import express from 'express';

export abstract class BaseController {
    async get(req: any, res: any) {
        throw Error('Method not implemented');
    }
    async post(req: any, res: any) {
        throw Error('Method not implemented');
    }
    async put(req: any, res: any) {
        throw Error('Method not implemented');
    }
    async delete(req: any, res: any) {
        throw Error('Method not implemented');
    }
}
