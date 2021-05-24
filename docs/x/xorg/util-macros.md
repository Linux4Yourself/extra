<package-info :package="package" showsbu2></package-info>

<script>
		new Vue({
		el: '#main',
		data: { package: {} },
		mounted: function () {
				this.getPackage('util-macros');
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

## Тестирование
> Этот пакет не имеет тестов

## Установка
```
make install
```

## Установленные файлы
* **Программы:** нет
* **Библиотеки:** нет
* **Установленные директории:** `$XORG_PREFIX/share/pkgconfig` и `$XORG_PREFIX/share/util-macros`
