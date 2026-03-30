"use client";

import { useEffect, useRef, useState } from "react";
import frogGreen from "../../../img/sprite/frog-green.png"

const ANIMATIONS: Record<string, { col: number; frames: number; fps?: number }> = {
	idle: { col: 0, frames: 2, fps: 2 },
	croak: { col: 1, frames: 3, fps: 3 },
	jump: { col: 2, frames: 3, fps: 4 },
	pain: { col: 3, frames: 3, fps: 1.5 },
	jig: { col: 4, frames: 3, fps: 4 },
}

function getDuration(name: string) {
	const config = ANIMATIONS[name]
	return (config.frames / (config.fps ?? 1.5)) * 1000
}

const DEFAULT_SEQ: string[] = ["croak", "idle"]

interface FrogSpriteProps {
	scale?: number
	animations?: string
	seq?: string[] // animations looped through
	idlePause?: number // idle between animations (ms)
}
const Frog = ({
	scale = 2,
	seq = DEFAULT_SEQ,
	idlePause = 1000
}: FrogSpriteProps) => {
	const [click, setClick] = useState<boolean>(false)
	const [currentAnimation, setAnimation] = useState<string>("idle")
	const idx = useRef(0)

	useEffect(() => {
		let timeout: ReturnType<typeof setTimeout>
		idx.current = 0

		function playNext() {
			const name = seq[idx.current % seq.length]
			idx.current++

			if (!click) {
				setAnimation(name)

				timeout = setTimeout(() => {
					setAnimation("idle")
					timeout = setTimeout(playNext, idlePause)
				}, getDuration(name))
			} else {
				setAnimation("jump")
				setClick(false)
			}

		}

		function playAnimation() {
			setAnimation(seq[0])
			return
		}

		if (seq.length > 1) {
			timeout = setTimeout(playNext, idlePause)
			return () => {
				clearTimeout(timeout)
				idx.current = 0
			}
		} else {
			playAnimation()
		}


	}, [seq, idlePause, click])

	const config = ANIMATIONS[currentAnimation]
	const duration = (config.frames / (config.fps ?? 1.5)).toFixed(3)
	const keyframeName = `frog-${currentAnimation}`

	return (
		<>
			<style>{`
				@keyframes ${keyframeName} {
					from { background-position: -${config.col * 32}px 0px; }
					to   { background-position: -${config.col * 32}px -${config.frames * 32}px; }
				}
			`}</style>
			<div
				style={{ transform: `scale(${scale})`, display: "inline-block", cursor: "pointer" }}
				onClick={() => setClick(true)}
			>
				<div role="img"
					title="Mr. Frog"
					style={{
						width: 32,
						height: 32,
						filter: "saturate(125%)",
						backgroundImage: `url(${frogGreen.src})`,
						backgroundSize: "256px auto",
						imageRendering: "pixelated",
            			animation: `${keyframeName} ${duration}s steps(${config.frames}) infinite`,
					}}
				/>
			</div>
		</>
	)
}

export default Frog;