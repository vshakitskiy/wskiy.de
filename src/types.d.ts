export type Insert = {
  type: string
  color: string
  text: string
  link?: string
}

export type EnRu<T> = {
  en: T
  ru: T
}

export type BaseSection = {
  title: string
  text: string
}

export type AboutContent<T> = {
  about: T
  current: T
}

export type AboutOrigin = EnRu<AboutContent<string>> & {
  inserts: AboutContent<Insert[]>
}

export type About = {
  text: AboutContent<string>
  inserts: AboutContent<Insert[]>
}

export type TechnologiesOrigin = EnRu<BaseSection> & {
  inserts: EnRu<Insert[]>
}

export type Technologies = {
  text: BaseSection
  inserts: Insert[]
}

export type Project = {
  name: string
  theme: string
  text: string
  image: string
  github: string
}

export type ProjectsOrigin = EnRu<BaseSection> & {
  list: (EnRu<Project> & {
    inserts: EnRu<Insert[]>
  })[]
}

export type Projects = BaseSection & {
  list: {
    data: Project
    inserts: Insert[]
  }[]
}

export type ContactContent = BaseSection & {
  or: string
  awake: string
  asleep: string
}

export type ContactOrigin = EnRu<ContactContent>

export type Text = {
  about: About
  technologies: Technologies
  projects: Projects
  contact: ContactContent
}

export type Age = {
  age: string
  beforePoint: string
  afterPoint: string
}

export type Country = {
  code: string
  name: string
  flag: string
}

export type Language = "en" | "ru"
