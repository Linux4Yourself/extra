<package-info :package="package" showsbu2></package-info>

<script>
		new Vue({
		el: '#main',
		data: { package: {} },
		mounted: function () {
				this.getPackage('xcb-util');
		},
		methods: {
			getPackage: function(name) {
					getPackage(name)
					.then(response => this.package = response);
			},
		}
  })
</script>

## Зависимости
### Необходимые
* [libxcb](x/xorg/libxcb.md)

### Опциональные
* Doxygen (для документации)

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
* **Установленные библиотеки:** libxcb-util.so
* **Установленные диреткории:** нет
