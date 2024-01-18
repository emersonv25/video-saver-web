import CardInfo from "@/components/card-info";
import { title, subtitle } from "@/components/primitives";
import SearchForm from "@/components/search-form";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>Video&nbsp;</h1>
				<h1 className={title({ color: "violet" })}>Saver&nbsp;</h1>
				<br />
				<h2 className={subtitle({ class: "mt-4" })}>
					Baixe qualquer vídeo da internet de forma rápida, fácil e grátis
				</h2>
			</div>
			<SearchForm></SearchForm>
			<CardInfo></CardInfo>
		</section>
	);
}
