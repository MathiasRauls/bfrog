import { cache, Suspense, use } from "react";
import Image from "next/image";

import { env } from "@/lib/env";
import { ROUTES } from "@/lib/const/routes";

import frogPot from "@/img/sprite/pot.png";
import Skeleton from "@/components/skeletons/basicSkeleton";
import Datatable from "@/components/dataTable";

type Coin = {
	usd: number
	// usd_market_cap: number
	// usd_24h_vol: number
	// usd_24h_change: number
	// last_updated_at: number
}

const getPrice = cache(async (): Promise<Coin> => {
	return fetch(ROUTES.CG.TEST, {
		method: "GET",
		headers: { "x-cg-api-key": env.CG_API_KEY },
	})
	.then( async r => {
		const data: Coin = Object.values(await r.json())[0] as Coin
		if (!data?.usd) { throw new Error("No price data..") }
		return data
	})
	.catch(e => { throw new Error("Failed to get price: ", e) })
})

export default function Home() {
	const coin = use(getPrice())
	const price = new Intl.NumberFormat("en-US", {
		// notation: "compact",
		style: "currency",
		currency: "USD"
	}).format(coin?.usd)

	return (
		<>
			<main
				className="p-4 max-w-[1200px] m-auto"
			>
				<div
					className="
						flex flex-wrap gap-2 w-full h-full items-stretch justify-start
						text-white
					"
				>
					<div
						className="
							flex flex-1 flex-col gap-2 h-full
						"
					>
						<div
							className="
								flex gap-2
								flex-wrap md:flex-nowrap
							"
						>
							<section
								id="frogStatus"
								className="
									themedCard
									w-full md:max-w-[350px] content-center
								"
							>
								<Image
									src={frogPot}
									alt="Frog chillen in a pot"
									className="
										size-[350px] aspect-square m-auto
									"
									style={{
										imageRendering: "pixelated"
									}}
								/>
							</section>
							<section
								id="marketOverview"
								className="
									themedCard
									flex-1 md:flex-2
									min-h-[500px]
									min-w-85
								"
							>
								<div
									className="
										px-2 py-2 bg-cafe-l rounded-full
										flex gap-2 items-center
									"
								>
									<Image
										width={20}
										height={20}
										src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png"
										alt="Frog chillen in a pot"
										className=""
										style={{ imageRendering: "pixelated" }}
									/>
									<div
										className="
											leading-0
											flex gap-2 items-center
										"
									>
										<small className="text-[.75rem] text-acn-d">BTC</small>
										<hr className="border"/>
										<Suspense fallback={<Skeleton className="bg-dom-d rounded-2xl h-fit w-full" />}>
											<h1 className="text-sm font-bold">${price}</h1>
										</Suspense>
									</div>
								</div>
								<Datatable />
							</section>
						</div>
						<section
							id="marketTrends"
							className="
								themedCard min-h-[200px]
							"
						>
							<p>Market Trends</p>
						</section>
					</div>
					<div
						className="flex flex-col gap-2 max-lg:w-full lg:w-[300px]"
					>
						<section
							id="googleAd"
							className="
								themedCard h-25
							"
						>
							<p>Ad</p>
						</section>
						<section
							id="marketNews"
							className="
								themedCard flex-1 min-h-[300px] max-lg:w-full
							"
						>
							<p>Market News</p>
						</section>
					</div>
				</div>
			</main>
		</>
	);
}
