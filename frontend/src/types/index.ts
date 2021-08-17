export interface Repetition {
    id : string,
    repetitions : number,
    weight : number
}

export interface Exercise {
    name : string,
    set : Repetition[],
    id : string
}

export interface Workout {
    _id : string,
    title : string,
    exerciseList : Exercise[],
    dateCreated : number,
    userId : string
}
