"use client";

export default function CareerSummary({
roadmap,
}:any){

return(

<div className="rounded-3xl bg-zinc-900 p-8">

<h1 className="text-4xl font-bold">

Current Level

</h1>

<p className="mt-5 text-3xl text-cyan-400">

{roadmap.currentLevel}

</p>

<p className="mt-8 text-zinc-400">

{roadmap.motivation}

</p>

</div>

);

}