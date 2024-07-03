export class Column{
  constructor(
    public name: string,
    public tasks: Task[],

  ) {
  }
}

export interface Task{
  name:string
  description:string
  status:'Todo' | 'InProgress' | 'Done'
}
