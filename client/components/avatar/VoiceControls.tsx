"use client";

interface Props{

startListening:()=>void;

stopListening:()=>void;

listening:boolean;

}

export default function VoiceControls({

startListening,

stopListening,

listening,

}:Props){

return(

<div className="flex gap-4">

<button

onClick={

listening

?

stopListening

:

startListening

}

className="rounded-xl bg-cyan-500 px-6 py-3 font-bold"

>

{

listening

?

"Stop"

:

"Start Talking"

}

</button>

</div>

);

}