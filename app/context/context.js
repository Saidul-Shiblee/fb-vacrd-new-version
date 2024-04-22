"use client";
import { createContext, useCallback, useContext, useState } from "react";
import { useImmerReducer } from "use-immer";
import {rootReducer  } from "../reducers/rootReducer";
import { DEFAULT_STATE } from "../context/store";
import { SessionProvider } from 'next-auth/react';

export const Context = createContext();

export function useGlobalContext() {
    const globalContext = useContext(Context)
    return globalContext;
}

export function ContextProvider({ children }) {
    const [state, dispatch] = useImmerReducer(rootReducer, DEFAULT_STATE);

    const[drawerOpen,setDrawerOpen]=useState(false)
    const [editSection, setEditSection]=useState('')
    const [editSectionType, setEditSectionType]=useState('')
    const [editFeaturedSectionID, setEditFeaturedSectionID] = useState('')
    // const [editFeaturedSectionPosition, setEditFeaturedSectionPosition]=useState('')
    // const [editSectionItemID, setEditDectionItemID] = useState('')
    // const [editSectionItemPosition, setEditSectionItemPosition]=useState('')

    // editFeaturedSectionPosition, setEditFeaturedSectionPosition, editSectionItemID, setEditDectionItemID, editSectionItemPosition, setEditSectionItemPosition
    const [iconID, setIconID]=useState(null)

    const handleChange = useCallback(
        (name, newValue) => {
            dispatch({
                payload: { name:newValue },
            });
        },
        [dispatch]
    );


    return (
        <Context.Provider value={{ state, handleChange, dispatch, drawerOpen, setDrawerOpen, editSection, setEditSection, iconID, setIconID, editSectionType, setEditSectionType,editFeaturedSectionID, setEditFeaturedSectionID }}>
            <SessionProvider>
            {children}
            </SessionProvider>
        </Context.Provider>
    );
}
