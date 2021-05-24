<package-info :package="package" showsbu2></package-info>

<script>
		new Vue({
		el: '#main',
		data: { package: {} },
		mounted: function () {
				this.getPackage('libxdmcp');
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
* [xorgproto](xorgproto.md)

## Настройка

```bash
./configure $XORG_CONFIG --docdir=/usr/share/doc/libXdmcp-1.1.3
```

## Компиляция

```bash
make
```

## Тестирование

?> Этот пакет не имеет тестов

## Установка

```bash
make install
```

## Установленные файлы
* **Установленные программы:** нет
* **Установленные библиотеки:** libXdmcp.so
* **Установленные директории:** `$XORG_PREFIX/share/doc/libXdmcp`
