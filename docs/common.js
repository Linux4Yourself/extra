Vue.component('package-info', {
	props: {
		package: Object,
		showsbu: Boolean,
	},
	template: `
	<div class="pkg">
		<p>{{ package.description }}</p>
		<p class="pkg-desc">
			Ссылка для скачивания: <a :href="package.url"><b>{{ package.url }}</b></a>
			<br />
			Текущая версия: <b>{{ package.version }}</b>
			<br />
			Домашняя страница: <a :href="package.homeUrl"><b>{{ package.homeUrl }}</b></a>
			<br />
			Размер архива: <b>{{ package.size }} Mb</b>

			<span v-if="showsbu">
				<br />
				<span v-if="package.sbu">Приблизительное время сборки: <b>{{ package.sbu }} SBU</b></span>
			</span>
		</p>
		<slot></slot>
	</div>`,
});

Vue.component('warn', {
		template: `
			<div class="warn-description">
				<slot></slot>
			</div>
		`,
});
