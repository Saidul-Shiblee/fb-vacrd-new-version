export const rootReducer = (state, payload) => {
    const key = Object.keys(payload)[0]
    switch (key) {
        case "primaryActions":
        case "secondaryActions":
        case "featuredSections":
            state[key] = [...state[key], payload[key]];
            return;
        case 'removePrimaryAction':
            state.primaryActions = state.primaryActions.filter(el => el.id !== payload[key].id)
            return;
        case 'changePrimaryActionText':
            state.primaryActions = state.primaryActions.map(el => {
                if (el.id === payload[key].id) {
                    el.value = payload[key].value
                }
                return el
            })
        case 'removeSecondaryAction':
            state.secondaryActions = state.secondaryActions.filter(el => el.id !== payload[key].id)
            return;
        case 'changeSecondaryActionText':
            state.secondaryActions = state.secondaryActions.map(el => {
                if (el.id === payload[key].id) {
                    el.value = payload[key].value
                }
                return el
            })
        case "reOrderFeaturedSections":
            state.featuredSections = payload[key]
            return;
        case "reOrderFeaturedSectionItems":
            state.featuredSections = state.featuredSections.map(el => {
                const section = payload[key].sectionName
                const reOrderedItems = payload[key].items
                if (Object.keys(el)[0] === section) {
                    el[section].sectionItems = reOrderedItems
                }
                return el
            })
            return
        case "setFeaturedSectionTitle":
            state.featuredSections = state.featuredSections.map(el => {
                const section = payload[key].sectionName
                if (Object.keys(el)[0] === section) {
                    el[section].sectionTitle = payload[key].value
                }
                return el
            })
            return
        case 'attachMedia':
            state.featuredSections = state.featuredSections.map(el => {
                const section = payload[key].sectionName
                if (Object.keys(el)[0] === section) {
                    el[section].sectionItems = [...el[section].sectionItems, { [payload[key].type + "_" + payload[key].id]: payload[key].data }]
                }
                return el
            })
            return
        case 'button':
            state.featuredSections = state.featuredSections.map(el => {
                const section = payload[key].sectionName
                if (Object.keys(el)[0] === section) {
                    el[section].sectionItems = [...el[section].sectionItems, { [key + "_" + payload[key].id]: { link: "", text: "" } }]
                }
                return el
            })
            return
        case 'text':
            state.featuredSections = state.featuredSections.map(el => {
                const section = payload[key].sectionName
                if (Object.keys(el)[0] === section) {
                    el[section].sectionItems = [...el[section].sectionItems, { [key + "_" + payload[key].id]: { text: "" } }]
                }
                return el
            })
            return
        case 'contact':
            state.featuredSections = state.featuredSections.map(el => {
                const section = payload[key].sectionName
                if (Object.keys(el)[0] === section) {
                    el[section].sectionItems = [...el[section].sectionItems, { [key + "_" + payload[key].id]: { text: "" } }]
                }
                return el
            })
            return
        case 'iframe':
            state.featuredSections = state.featuredSections.map(el => {
                const section = payload[key].sectionName
                if (Object.keys(el)[0] === section) {
                    el[section].sectionItems = [...el[section].sectionItems, { [key + "_" + payload[key].id]: { text: "" } }]
                }
                return el
            })
            return
        case 'code':
            state.featuredSections = state.featuredSections.map(el => {
                const section = payload[key].sectionName
                if (Object.keys(el)[0] === section) {
                    el[section].sectionItems = [...el[section].sectionItems, { [key + "_" + payload[key].id]: { text: "" } }]
                }
                return el
            })
            return
        case 'button':
            state.featuredSections = state.featuredSections.map(el => {
                const section = payload[key].sectionName
                if (Object.keys(el)[0] === section) {
                    el[section].sectionItems = [...el[section].sectionItems, { [key + "_" + payload[key].id]: { link: "", text: "" } }]
                }
                return el
            })
            return
        case 'product':
            state.featuredSections = state.featuredSections.map(el => {
                const section = payload[key].sectionName
                if (Object.keys(el)[0] === section) {
                    el[section].sectionItems = [...el[section].sectionItems, { [key + "_" + payload[key].id]: { image: "", title: "", description: "", price: "", buttonLink: "", buttonText: "" } }]
                }
                return el
            })
            return
        case 'changeFeaturedSectionItemText':
            state.featuredSections = state.featuredSections.map(el => {
                const section = payload[key].sectionName
                if (Object.keys(el)[0] === section) {
                    el[section].sectionItems = el[section].sectionItems.map(el1 => {
                        const sectionItem = payload[key].item
                        const sectionField = payload[key].field
                        const sectionFieldValue = payload[key].value
                        if (Object.keys(el1)[0] === sectionItem) {
                            el1[sectionItem][sectionField] = sectionFieldValue
                        }
                        return el1
                    })
                }
                return el
            })
            return
        case 'personalInfo':
            const objectKey = payload[key].property
            const value = payload[key].value
            state[key] = { ...state[key], [objectKey]: value }
        case "removeFeaturedSctionItem":
            state.featuredSections = state.featuredSections.map((el, index) => {
                const section = payload[key].sectionName
                if (Object.keys(el)[0] === section) {
                    const sectionItem = payload[key].item
                    el[section].sectionItems = el[section].sectionItems.filter(el1 => Object.keys(el1)[0] !== sectionItem)
                }
                return el
            })
        case "removeFeaturedSection":
            state.featuredSections = state.featuredSections.filter((el, index) => Object.keys(el)[0] !== payload[key])
            return;
        case "toggleItem":
            const itemName = payload[key].itemName
            const itemFields = payload[key].fields
            if (state.hasOwnProperty(itemName)) {
                delete state[itemName]
            } else {
                state[itemName] = { ...itemFields }
            }
            return;
        case "ChangeIcon":
            const iconId = payload[key].id
            const iconField = payload[key].field;
            const iconValue = payload[key].value
            state.primaryActions = state.primaryActions.map(el => {
                if (el.id === iconId) {
                    return {
                        ...el,
                        style: {
                            ...el.style,
                            [iconField]: iconValue
                        }
                    }
                } else {
                    return el
                }
            })
        case "ChangeColorOrText":
            const p = payload[key].item
            const k = payload[key].field;
            const v = payload[key].value
            state[p] = { ...state[p], [k]: v }
        default:
            state[key] = payload[key];
            return;
    }
};
