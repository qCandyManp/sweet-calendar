import { User } from '../models/user';

export type Calendar = {
    uuid: string,
    owner: User,
}

export type appointment = {
    uuid: string,
    calendar: Calendar,
    date: Date,
}