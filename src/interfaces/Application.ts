export interface IApplicationsCompany {
    id: number
    jobTitle: string
    application_count: number
    lastProcessDate: Date
    lastStatus: Date
    candidate: string
}

export interface IApplicationsCandidate {
    id: number
    jobTitle: string
    application_count: number
    lastProcessDate: Date
    lastStatus: Date
    company: string
}

