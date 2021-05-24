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
* [util-macros](util-macros.md)

## Настройка
В документации к этому пакету рекомендуют собирать программу в отдельном каталоге `build`:

```bash
mkdir build && cd build
```

Теперь подготовьте пакет `xorgproto` к компиляции:

```
meson --prefix=$XORG_PREFIX -Dlegacy=true ..
```

## Компиляция

```bash
ninja
```


## Установка

```
ninja install &&

install -vdm 755 $XORG_PREFIX/share/doc/xorgproto-2020.1 &&
install -vm 644 ../[^m]*.txt ../PM_spec $XORG_PREFIX/share/doc/xorgproto-2020.1
```

### Объяснение новых команд и значений

* `install -vm 644 ../[^m]*.txt ../PM_spec $XORG_PREFIX/share/doc/xorgproto-2020.1` - не устанавливать текстовые файлы в `/usr/share/doc`. Часть `[^m]` предотвращает копирование `meson_options.txt`

## Установленные файлы
* **Установленные программы:** нет
* **Установленные библиотеки:** нет
* **Установленные директории:** `$XORG_PREFIX/include/GL`, `$XORG_PREFIX/include/X11`, и `$XORG_PREFIX/share/doc/xorgproto-2020.1`
