import {  ReactNode, createContext, useMemo, useReducer } from "react";
import {ActivityState, ActivityActions, activityReducer, initialState } from "../reducers/activity-reducer";
import { categories } from "../data/categories";
import { Activity } from "../types";

type ActivityProviderProps = {
    children: ReactNode
}
//-----4ta----
type ActivityContextProps = {
    state: ActivityState,
    dispatch: React.Dispatch<ActivityActions>
    netCalories: number
    caloriesConsumed: number
    caloriesBurned: number  
    categoryName: (category: Activity["category"]) => string[]
    isEmptyActivities: boolean
}
// ----- 1era
export const ActivityContext = createContext<ActivityContextProps>(null!)

export const ActivityProvider = ({children} : ActivityProviderProps) => {
//------------

    //----3era
    const [state, dispatch] = useReducer(activityReducer, initialState)

    //operaciones
        // Contadores
        const caloriesConsumed = useMemo(() => state.activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [state.activities])
        const caloriesBurned = useMemo(() => state.activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [state.activities])
        const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [state.activities])

        //Al activity list
        const categoryName = useMemo(() => 
            (category: Activity['category']) => categories.map( cat => cat.id === category ? cat.name : '' )
        , [state.activities])
        
        const isEmptyActivities = useMemo(() => state.activities.length === 0, [state.activities])

//------2da---    
    return(
        <ActivityContext.Provider value={{
            state,
            dispatch,
            netCalories,
            caloriesConsumed,
            caloriesBurned,
            categoryName,
            isEmptyActivities
        }}>
            {children}
        </ActivityContext.Provider>
    )
}