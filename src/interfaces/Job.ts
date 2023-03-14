import { IApplicationsCompany } from "./Application"

export interface IFormJob {
    title: string
    description: string
    open_date: Date
    close_date: Date
}

export interface IJobList {
    id: number
    title: string
    description: string
    application_count: number
    open_date: Date
    close_date: Date
    company: string
}

export interface IJobDetailCandidate extends IJobList {
    id: number;
}

export interface IJobDetailCompany extends IJobList, IApplicationsCompany {
    id: number;
}
