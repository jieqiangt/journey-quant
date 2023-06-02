
import { ResponseInterface } from "@/models/base.model";

export class AppError extends Error {
    constructor(public response: ResponseInterface) {
        super();
    }
}
