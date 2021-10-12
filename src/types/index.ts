
export interface IRepetition {
    id? : string,
    repetitions : number,
    weight : number
    completed? : boolean
}

export interface IExercise {
    name : string,
    set : IRepetition[],
    id : string,
    skipped? : boolean
}

export interface IWorkout {
    _id : string,
    title : string,
    exerciseList : IExercise[],
    dateCreated : number,
    userId : string
    timeOfStart? : number,
    timeOfEnd? : number,
    historyId? : string
}

export interface Stat {
    title : string,
    value : string
}

export interface repData {
    workoutId : string,
    exerciseId : string,
    repItem : IRepetition
}
