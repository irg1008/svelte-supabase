<script lang="ts">
	import Meta from "$lib/components/atoms/Meta.svelte";
	import Carousel, { Item } from "$lib/components/molecules/Carousel";

	const imgPrefix = "/img/pictures/web/";
	const imgSufix = "-min.webp";
	const parsedSrc = (num: number) => `${imgPrefix}${num}${imgSufix}`;

	const images: { src: number; title: string }[] = [
		{
			src: 1,
			title: "Mujer quemada",
		},
		{
			src: 2,
			title: "Nadando en resina",
		},
		{
			src: 3,
			title: "Mujer de espaldas quemada",
		},
		{
			src: 4,
			title: "Salinas",
		},
		{
			src: 5,
			title: "Mar borroso",
		},
		{
			src: 6,
			title: "Dos islas",
		},
		{
			src: 7,
			title: "Mujer quemada 2",
		},
		{
			src: 8,
			title: "Mujer de espaldas",
		},
		{
			src: 9,
			title: "Mar de resina",
		},
		{
			src: 10,
			title: "Desnuda ante el sol",
		},
		{
			src: 11,
			title: "Nadando en resina 2",
		},
		{
			src: 12,
			title: "Paisaje de Ibiza",
		},
	];
</script>

<Meta title="Home" />

<Carousel useCarouselInterval intervalTime={5}>
	{#each images as image, i}
		<Item>
			<!--h1 class="bottom-text">{image.title}</h1-->
			<img src={parsedSrc(image.src)} alt={image.title} />
		</Item>
	{/each}
	<Item>
		<div class="info">
			<h1>Info</h1>
			<p>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto
				exercitationem inventore cupiditate eaque cumque? Debitis error
				laudantium mollitia sed nemo sint reprehenderit, deleniti aliquam,
				quaerat inventore dignissimos consequatur aperiam veritatis? Lorem ipsum
				dolor sit, amet consectetur adipisicing elit. Incidunt dicta ea est
				ipsum veritatis, pariatur accusamus eius similique delectus recusandae
				blanditiis dolorum aspernatur voluptatum architecto autem molestiae
				aliquam libero suscipit! Lorem ipsum dolor sit amet consectetur
				adipisicing elit. Similique libero atque voluptates error doloribus
				voluptate rerum facere, consequatur rem? In facere illum adipisci quidem
				ab cum cupiditate ex molestiae ut! Lorem ipsum dolor sit, amet
				consectetur adipisicing elit. Numquam pariatur delectus sunt officiis
				dolore aliquid accusantium magni modi, nisi enim beatae eius harum
				iusto. Ipsa expedita repudiandae modi blanditiis nihil? Lorem ipsum
				dolor sit amet consectetur adipisicing elit. Perspiciatis facilis
				delectus cum eum non repellendus rem doloribus tempora, quisquam unde
				quam illo quidem placeat nam quis aliquam porro suscipit sint. Lorem
				ipsum dolor sit amet consectetur adipisicing elit. Illum laborum maxime,
				facilis nam laudantium voluptate quasi doloribus, magnam labore rerum at
				nisi eligendi odit suscipit veniam vitae sint quas tempore. Lorem ipsum,
				dolor sit amet consectetur adipisicing elit. Cupiditate ipsa odio nulla?
				Nesciunt veniam quis vero nemo fugit necessitatibus, molestiae, nostrum
				consequatur earum illum neque natus deleniti ratione aspernatur nihil?
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto
				exercitationem inventore cupiditate eaque cumque? Debitis error
				laudantium mollitia sed nemo sint reprehenderit, deleniti aliquam,
				quaerat inventore dignissimos consequatur aperiam veritatis? Lorem ipsum
				dolor sit, amet consectetur adipisicing elit. Incidunt dicta ea est
				ipsum veritatis, pariatur accusamus eius similique delectus recusandae
				blanditiis dolorum aspernatur voluptatum architecto autem molestiae
				aliquam libero suscipit! Lorem ipsum dolor sit amet consectetur
				adipisicing elit. Similique libero atque voluptates error doloribus
				voluptate rerum facere, consequatur rem? In facere illum adipisci quidem
				ab cum cupiditate ex molestiae ut! Lorem ipsum dolor sit, amet
				consectetur adipisicing elit. Numquam pariatur delectus sunt officiis
				dolore aliquid accusantium magni modi, nisi enim beatae eius harum
				iusto. Ipsa expedita repudiandae modi blanditiis nihil? Lorem ipsum
				dolor sit amet consectetur adipisicing elit. Perspiciatis facilis
				delectus cum eum non repellendus rem doloribus tempora, quisquam unde
				quam illo quidem placeat nam quis aliquam porro suscipit sint. Lorem
				ipsum dolor sit amet consectetur adipisicing elit. Illum laborum maxime,
				facilis nam laudantium voluptate quasi doloribus, magnam labore rerum at
				nisi eligendi odit suscipit veniam vitae sint quas tempore. Lorem ipsum,
				dolor sit amet consectetur adipisicing elit. Cupiditate ipsa odio nulla?
				Nesciunt veniam quis vero nemo fugit necessitatibus, molestiae, nostrum
				consequatur earum illum neque natus deleniti ratione aspernatur nihil?
			</p>
		</div>
	</Item>
</Carousel>

<style lang="postcss">
	img {
		@apply block
			h-screen
			w-full
			object-contain;
	}

	.bottom-text {
		@apply absolute
			text-opacity-40
		text-white
			text-left
			w-full
			left-20
			bottom-40;
	}

	.info {
		@apply p-6
			bg-light
			flex
			flex-col
			text-darker
			min-h-full
			gap-6;
	}

	h1 {
		@apply font-bold
      uppercase
      text-8xl;
	}
</style>
