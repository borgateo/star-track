export type RepoItem = {
  id: number
  name: string
  full_name: string
  description: string
  html_url: string
  watchers: number
  language: string
  stargazers_count: number
}

export type RepoData = {
  total_count: number
  incomplete_results: boolean
  items: Array<RepoItem>
}
