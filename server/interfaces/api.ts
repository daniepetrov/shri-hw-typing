export interface IApiConfPostData {
  repoName: string
  buildCommand: string
  mainBranch: string
  period: number
}

export interface IApiConfGetData extends IApiConfPostData {
  id: string
}

export type BuildStatusType = 'InProgress' | 'Waiting' | 'Success' | 'Fail'

export interface IApiBuildData {
  id: string
  configurationId: string
  buildNumber: number
  commitMessage: string
  commitHash: string
  branchName: string
  authorName: string
  status: BuildStatusType
  start: Date
  duration: number
}

  


