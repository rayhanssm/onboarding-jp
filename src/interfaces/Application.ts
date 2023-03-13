export interface IApplicationsCompany {
    id: number
    name: string
    job_title: string
    last_process_date: Date
    last_status: number
    candidate: string
}

export interface IApplicationsCandidate  {
    id: number
    job_title: string
    last_process_date: Date
    last_status: number
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
