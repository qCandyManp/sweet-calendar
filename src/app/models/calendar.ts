import { User } from '../models/user';

export type Calendar = {
    uuid: string,
    title: string,
    owner: User,
}

export type appointment = {
    uuid: string,
    calendar: Calendar,
    date: Date,
}