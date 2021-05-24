<package-info :package="package" showsbu2></package-info>

<script>
		new Vue({
		el: '#main',
		data: { package: {} },
		mounted: function () {
				this.getPackage('xorgproto');
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
./configure $XORG_PREFIX
```

## Компиляция
```bash
make
```

### Тестирование
```bash
make check
```

## Установка
```bash
make install
```

## Установленные файлы
* **Установленные программы:** нет
* **Установленные библиотеки:** libXau.so
* **Установленные директории:** нет
