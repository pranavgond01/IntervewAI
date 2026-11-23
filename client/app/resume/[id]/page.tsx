"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";

export default function ResumeAnalysisPage() {

const params=useParams();

const id=params.id as string;

const [resume,setResume]=useState<any>(null);

const [loading,setLoading]=useState(true);

useEffect(()=>{

loadResume();

},[]);

async function loadResume(){

const res=await api.get(`/resume/${id}`);

setResume(res.data);

setLoading(false);

}

if(loading){

return(

<div className="flex h-screen items-center justify-center">

Loading Resume...

</div>

);

}

return(

<main className="mx-auto max-w-7xl p-10 space-y-8">

<div>

<h1 className="text-5xl font-bold">

Resume Analysis

</h1>

<p className="text-zinc-400 mt-2">

AI Generated Resume Report

</p>

</div>

<div className="grid grid-cols-3 gap-6">

<div className="rounded-2xl bg-zinc-900 p-8">

<p className="text-zinc-400">

ATS Score

</p>

<h2 className="mt-4 text-6xl font-bold text-cyan-400">

{resume.atsScore}

</h2>

</div>

<div className="rounded-2xl bg-zinc-900 p-8">

<p className="text-zinc-400">

Overall Score

</p>

<h2 className="mt-4 text-6xl font-bold text-green-400">

{resume.overallScore}

</h2>

</div>

<div className="rounded-2xl bg-zinc-900 p-8">

<p className="text-zinc-400">

Experience

</p>

<h2 className="mt-4 text-4xl font-bold">

{resume.experienceLevel}

</h2>

</div>

</div>

<div className="rounded-2xl bg-zinc-900 p-8">

<h2 className="text-2xl font-bold">

AI Summary

</h2>

<p className="mt-6 leading-8">

{resume.summary}

</p>

</div>

<div className="grid md:grid-cols-2 gap-6">

<div className="rounded-2xl bg-zinc-900 p-8">

<h2 className="text-2xl font-bold">

Skills

</h2>

<div className="mt-6 flex flex-wrap gap-3">

{resume.skills?.map((skill:string)=>(

<div

key={skill}

className="rounded-full bg-cyan-500 px-4 py-2"

>

{skill}

</div>

))}

</div>

</div>

<div className="rounded-2xl bg-zinc-900 p-8">

<h2 className="text-2xl font-bold">

Missing Skills

</h2>

<div className="mt-6 flex flex-wrap gap-3">

{resume.missingSkills?.map((skill:string)=>(

<div

key={skill}

className="rounded-full bg-red-500 px-4 py-2"

>

{skill}

</div>

))}

</div>

</div>

</div>

<div className="grid md:grid-cols-2 gap-6">

<div className="rounded-2xl bg-zinc-900 p-8">

<h2 className="text-2xl font-bold">

Strengths

</h2>

<ul className="mt-5 space-y-3">

{resume.strengths?.map((item:string)=>(

<li key={item}>

✓ {item}

</li>

))}

</ul>

</div>

<div className="rounded-2xl bg-zinc-900 p-8">

<h2 className="text-2xl font-bold">

Improvements

</h2>

<ul className="mt-5 space-y-3">

{resume.improvements?.map((item:string)=>(

<li key={item}>

• {item}

</li>

))}

</ul>

</div>

</div>

<div className="flex gap-6">

<Link

href="/interview/setup"

className="rounded-xl bg-cyan-500 px-10 py-4 text-xl font-bold"

>

Continue To Interview

</Link>

<Link

href="/dashboard"

className="rounded-xl border border-zinc-700 px-10 py-4 text-xl"

>

Dashboard

</Link>

</div>

</main>

);

}