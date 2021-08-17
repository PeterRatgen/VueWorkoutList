export interface IRepetition {
    id : string,
    repetitions : number,
    weight : number
}

export interface IExercise {
    name : string,
    set : IRepetition[],
    id : string
}

export interface IWorkout {
    _id : string,
    title : string,
    exerciseList : IExercise[],
    dateCreated : number,
    userId : string
}
