<package-info :package="package" showsbu2></package-info>

<script>
		new Vue({
		el: '#main',
		data: { package: {} },
		mounted: function () {
				this.getPackage('xbitmaps');
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

## Установка

```bash
make install
```

## Установленные файлы
* **Установленные программы:** нет
* **Установленные библиотеки:** нет
* **Установленные директории:** `$XORG_PREFIX/include/X11/bitmaps`
