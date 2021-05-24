<package-info :package="package" showsbu2></package-info>

<script>
		new Vue({
		el: '#main',
		data: { package: {} },
		mounted: function () {
				this.getPackage('libxcb');
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
* [libXau](x/xorg/libxau.md)
* [xcb-proto](x/xorg/xcb-proto.md)

### Рекомендуемые
* [libXdmcp](x/xorg/libxdmcp.md)

## Настройка

```bash
CFLAGS="${CFLAGS:--O2 -g} -Wno-error=format-extra-args" ./configure $XORG_CONFIG \
            --without-doxygen \
            --docdir='${datadir}'/doc/libxcb-1.14
```

## Компиляция

```bash
make
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
* **Установленные программы:** нет
* **Установленные библиотеки:** libxcb.so, libxcb-composite.so, libxcb-damage.so, libxcb-dpms.so, libxcb-dri2.so, libxcb-dri3.so, libxcb-glx.so, libxcb-present.so, libxcb-randr.so, libxcb-record.so, libxcb-render.so, libxcb-res.so, libxcb-screensaver.so, libxcb-shape.so, libxcb-shm.so, libxcb-sync.so, libxcb-xf86dri.so, libxcb-xfixes.so, libxcb-xinerama.so, libxcb-xinput.so, libxcb-xkb.so, libxcb-xtest.so, libxcb-xvmc.so, и libxcb-xv.so
* **Установленные директории:** `$XORG_PREFIX/include/xcb` и `$XORG_PREFIX/share/doc/libxcb-1.14`
