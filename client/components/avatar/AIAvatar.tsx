"use client";

import { motion } from "framer-motion";

interface Props {
    speaking: boolean;
    listening: boolean;
}

export default function AIAvatar({
    speaking,
    listening,
}: Props) {

    return (

        <div className="flex flex-col items-center">

            <motion.div

                animate={{
                    scale: speaking ? [1,1.05,1] : 1,
                }}

                transition={{
                    repeat: speaking ? Infinity : 0,
                    duration: .6,
                }}

                className="
                h-52
                w-52
                rounded-full
                bg-gradient-to-br
                from-cyan-400
                to-blue-700
                flex
                items-center
                justify-center
                text-8xl
                shadow-2xl
                "

            >

                🤖

            </motion.div>

            <div className="mt-6">

                {speaking &&

                    <p className="text-cyan-400">

                        Speaking...

                    </p>

                }

                {listening &&

                    <p className="text-green-400">

                        Listening...

                    </p>

                }

            </div>

        </div>

    );

}