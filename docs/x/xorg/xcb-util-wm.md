<package-info :package="package" showsbu2></package-info>

<script>
		new Vue({
		el: '#main',
		data: { package: {} },
		mounted: function () {
				this.getPackage('xcb-util-wm');
		},
		methods: {
			getPackage: function(name) {
					getPackage(name)
					.then(response => this.package = response);
			},
		}
  })
</script>

## Настройка

```bash
./configure $XORG_CONFIG
```

## Сборка

```bash
make
```

## Установка

```bash
make install
```

## Установленные файлы
* **Установленные программы:** нет
* **Установленные библиотеки:** libxcb-ewmh.so и libxcb-icccm.so
* **Установленные директории:** нет
