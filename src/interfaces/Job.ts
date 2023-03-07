export interface ICreateJob {
    title: string
    description: string
    open_date: Date
    close_date: Date
}

export interface IJobList {
    id: number
    title: string
    application_count: number
    open_date: Date
    close_date: Date
    company: string
}

export interface IJobDetailCandidate extends IJobList{

}

export interface IJobDetailCompany {

}


