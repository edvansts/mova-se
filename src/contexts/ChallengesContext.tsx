import React, { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import firebase from 'firebase/app';
import 'firebase/database';

export interface UserAll {
    avatarUrl: string;
    challengesCompleted: number;
    currentXp: number;
    level: number;
    login: string;
    name: string;
}

import { useRouter } from 'next/router';

import LevelUpModal from '../components/LevelUpModal';
interface ChallengesContextState {
    level: number;
    currentExperience: number;
    currentChallenge: Challenge | null;
    experienceToNextLevel: number;
    currentLevelExperience: number;
    challengesCompleted: number;
    user: User;
    startNewChallenge: () => void;
    failedChallenge: () => void;
    successfullyChallenge: () => void;
    closeLevelUpModal: () => void;
    setUser: (value: User) => void;
}

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

export interface User {
    name: string;
    login: string;
    avatarUrl: string;
}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    user: User;
}

export const ChallengesContext = createContext({} as ChallengesContextState);

const ChallengeProvider: React.FC<ChallengesProviderProps> = ({
    children,
    ...rest
}) => {
    const [level, setLevel] = useState(rest.level ?? 0);
    const [currentExperience, setCurrentExperience] = useState(
        rest.currentExperience ?? 0,
    );
    const [
        currentChallenge,
        setCurrentChallenge,
    ] = useState<Challenge | null>();
    const [challengesCompleted, setChallengesCompleted] = useState(
        rest.challengesCompleted ?? 0,
    );
    const [isModalLevelUpOpened, setIsLevelUpModalOpened] = useState(false);

    const [database, setDatabase] = useState<firebase.database.Database>();

    const [user, setUser] = useState<User | null>(rest.user);

    const [userId, setUserId] = useState<string>();

    const currentLevelExperience = Math.pow(level * 4, 2);
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    const { locale } = useRouter();

    useEffect(() => {
        // if (!firebase) {
        if (!database) {
            const firebaseConfig = {
                apiKey: 'AIzaSyDXBD7tP3HTclCE-k_sKgRMwQdRQNxZlZk',
                authDomain: 'mova-se-dc2d1.firebaseapp.com',
                projectId: 'mova-se-dc2d1',
                storageBucket: 'mova-se-dc2d1.appspot.com',
                messagingSenderId: '867261760647',
                appId: '1:867261760647:web:3fdaf66b3587b2ccbea422',
                measurementId: 'G-VV7GDNQE88',
            };

            // Initialize Firebase
            firebase.initializeApp(firebaseConfig);
            const newDatabase = firebase.database();
            setDatabase(newDatabase);
        } else if (!userId) {
            // const newUserId = firebase.database().ref().child('users').push()
            //     .key;
            // setUserId(newUserId);
            // console.log(newUserId);
            const newUser: UserAll = {
                avatarUrl: user.avatarUrl,
                login: user.login,
                level: level,
                challengesCompleted: challengesCompleted,
                currentXp: currentExperience,
                name: user.name,
            };

            const refData = database.ref().child(`users`);

            refData
                .push(newUser)
                .then(response => {
                    console.log(response);
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            const refData = database.ref().child(`users`).child('MVe3pBXclKw6MxQMtp4');

            refData
                .get()
                .then(response => {
                    console.log(response.val());
                })
                .catch(err => {
                    console.log(err);
                });
        }
        // firebase.analytics();
        // }
    });

    useEffect(() => {
        if (currentExperience > experienceToNextLevel) {
            levelUp();
        }
    }, [currentExperience, level]);

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentExperience, challengesCompleted]);

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModalOpened(true);

        const audio = new Audio('sound/levelup.mp3');
        audio.volume = 0.75;
        audio.play();
    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpened(false);
    }

    function startNewChallenge() {
        const challenges = require(`../../locales/${locale}/challenges.json`) as Array<Challenge>;

        const randomChallengeIndex = Math.floor(
            Math.random() * challenges.length,
        );
        const newRandomChallenge = challenges[
            randomChallengeIndex
        ] as Challenge;
        setCurrentChallenge(newRandomChallenge);
        if (Notification.permission == 'granted') {
            new Notification('🛑  Novo desafio 🛑  Vamos se exercitar!', {
                body: `Valendo ${newRandomChallenge.amount}xp!`,
            });
        }
    }

    function successfullyChallenge() {
        setCurrentExperience(currentExperience + currentChallenge.amount);
        setChallengesCompleted(challengesCompleted + 1);
        setCurrentChallenge(null);
    }

    function failedChallenge() {
        setCurrentChallenge(null);
        const audio = new Audio('sound/funny-slip.mp3');
        audio.volume = 0.3;
        audio.play();
    }

    const state: ChallengesContextState = {
        level,
        currentExperience,
        currentChallenge,
        currentLevelExperience,
        experienceToNextLevel,
        challengesCompleted,
        user,
        startNewChallenge,
        failedChallenge,
        successfullyChallenge,
        closeLevelUpModal,
        setUser,
    };

    return (
        <ChallengesContext.Provider value={state}>
            {children}

            {isModalLevelUpOpened && <LevelUpModal />}
        </ChallengesContext.Provider>
    );
};

export default ChallengeProvider;
