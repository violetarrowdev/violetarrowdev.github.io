import { changePage } from '../util/Pages';
import { Console } from './Exports';

export default function AboutMe() {
    return (
        <div>
            <p><Console textInterval={10} swipeInterval={2} fullText="my name's finley, and this website is a small little project of mine i started to get comfortable 
            with react, but really, it's just a starting point. more than anything, i wanted a space i could talk about and host whatever projects i'm working on in my 
            own personal life in a single easy-to-access place, with a personal touch." /></p>

            <p><Console textInterval={10} swipeInterval={2} fullText="at time of writing, i'm 24 years old and recently moved to seattle after spending my entire life in massachusetts. how i wound up 
            here in particular is a story all its own, but i spent much of 2021 and 2022 travelling the country before i settled on where i wanted to be. in that process, 
            i wound up taking a lot of pictures of landscapes around the country, some of which i wanna host here eventually!" /></p>

            <p><Console textInterval={10} swipeInterval={2} fullText="in my downtime, i write short stories and song lyrics, sing, play keyboard, and i'm in the process 
            of learning guitar. fiction and music are easily two of the most important things in my life, and i've always been fascinated by the way 
            media shapes and communicates meaning." /></p>

            <p><Console textInterval={10} swipeInterval={2} fullText="so what's the deal with the violet motif? the simple answer is that i like the color violet 
            (the arrow part is a pun), but the more detailed answer is that i think at its core, the internet is a place to curate your identity and present 
            however you want. i'm queer, and like most queer people, a big part of discovering that was exploring myself in the safety of pseudo-anonymity online. 
            pseudonyms rule!" /></p>

            <p><Console textInterval={10} swipeInterval={2} fullText="thanks for reading. take it easy, traveler." /></p>

            <ul>
                <li><button type="button" onClick={() => changePage("/personal/")} ><Console fullText="> .." /></button></li>
            </ul>
        </div>
    )
}