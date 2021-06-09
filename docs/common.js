Vue.component('pkg', {
	props: {
		name: String,
		showsbu: Boolean,
		instsize: Boolean,
	},
	data() {
		return {
			package: {},
		};
	},
	mounted() {
		getPackage(this.name)
			.then(res => (this.package = res));
	},
	template: `
	<div v-if="package" class="pkg">
		<p>{{ package.description }}</p>
		<p class="pkg-desc">
			Ссылка для скачивания: <a :href="package.url"><b>{{ package.downloadUrl }}</b></a>
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
			<span v-if="instsize">
				<br />
				<span v-if="package.installedSize">Приблизительный размер после установки: <b>{{ package.installedSize }} МБ</b></span>
			</span>
		</p>
		<slot></slot>
	</div>`,
});

Vue.component('package-script', {
	props: {
		package: String,
		type: String,
	},
	data() {
		return {
			info: null
		};
	},
	mounted() {
		getPackageScript(this.package, this.type)
			.then(res => (this.info = res));
	},
	template: `
<pre class="pre">
{{ info }}
</pre>`,
});

Vue.component('warn', {
	template: `
			<div class="warn-description">
				<slot></slot>
			</div>
		`,
});
