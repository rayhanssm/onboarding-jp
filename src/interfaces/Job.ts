export interface IJobListDetail {
    id: number
    title: string
    applicationCount: number
    openDate: Date
    closeDate: Date
    company: string
}

export interface ICreateJob {
    title: string
    description: string
    openDate: Date
    closeDate: Date
}


