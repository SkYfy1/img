import { create } from 'zustand'
import { Info } from 'components/ProfileCard/ProfileInfo';

interface StorageState {
    userInfo: Info,
    setUserInfo: (data: Info) => void
}

const useStorage = create<StorageState>((set) => ({
    userInfo: {
        name: 'Jack Smith',
        pron: 'He/Him',
        work: 'Senior Product Designer at Webflow',
        twitter: 'kingjack'
    },
    setUserInfo: (data: Info) => set({ userInfo: data })
}));

export default useStorage;