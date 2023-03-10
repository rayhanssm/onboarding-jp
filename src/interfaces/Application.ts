export interface IApplicationsCompany {
    id: number
    job_title: string
    last_process_date: Date
    last_status: Date
    candidate: string
}

export interface IApplicationsCandidate  {
    id: number
    job_title: string
    last_process_date: Date
    last_status: Date
    company: string
}

export interface IApplicationsDetailCompany extends IApplicationsCompany {
    id: number
    status: string
    date: Date
}

export interface IApplicationsDetailCandidate extends IApplicationsCandidate {
    id: number
    status: string
    date: Date
}
