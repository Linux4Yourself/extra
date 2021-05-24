<package-info :package="package" showsbu2></package-info>

<script>
		new Vue({
		el: '#main',
		data: { package: {} },
		mounted: function () {
				this.getPackage('links');
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

### Рекомендуемые
* libevent

## Настройка

```bash
./configure --prefix=/usr --mandir=/usr/share/man
```

## Компиляция

```bash
make
```

## Установка

```bash
make install

install -v -d -m755 /usr/share/doc/links-2.21 &&
install -v -m644 doc/links_cal/* KEYS BRAILLE_HOWTO \
    /usr/share/doc/links-2.21
```

## Установленные файлы
* **Установленные программы:** `links`
* **Установленные библиотеки:** нет
* **Установленные директории:** `/usr/share/doc/links-*`
