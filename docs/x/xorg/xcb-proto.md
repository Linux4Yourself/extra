<package-info :package="package" showsbu2></package-info>

<script>
		new Vue({
		el: '#main',
		data: { package: {} },
		mounted: function () {
				this.getPackage('xcb-proto');
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
PYTHON=python3 ./configure $XORG_CONFIG
```

## Тестирование

```bash
make check
```

## Установка

```bash
make install
```

## Установленные файлы
* **Установленные файлы:** нет
* **Установленные библиотеки:** нет
* **Установленные директории:** `$XORG_PREFIX/share/xcb` и `$XORG_PREFIX/lib/python2.7/site-packages/xcbgen` или `$XORG_PREFIX/lib/python3.9/site-packages/xcbgen`
