<package-info :package="package" showsbu2></package-info>

<script>
		new Vue({
		el: '#main',
		data: { package: {} },
		mounted: function () {
				this.getPackage('mesa');
		},
		methods: {
			getPackage: function(name) {
					getPackage(name)
					.then(response => this.package = response);
			},
		}
  })
</script>

## Подготовка

Если вы скачали патч `xdemos` (необходим при тестировании установки Xorg), примените его:

```bash
patch -Np1 -i ../mesa-21.1.1-add_xdemos-1.patch
```

Отредактируйте скрипт из тестов для использования Python 3 вместо устаревшего Python 2:

```bash
sed '1s/python/&3/' -i bin/symbols-check.py
```

!> Следующие инструкции предназначены для *полной* сборки. Многие люди не захотят устанавливать драйверы, которые им не нужны или они не смогут использовать, поэтому в следующих абзацах объясняется, как установить то, что нужно.

### Gallium
Выберите нужные вам драйвера. Для x86 доступны `gallium драйвера`, или альтернативные i915, `nouveau`, `r300`, `r600`, `radeonsi`, `svga`, `swrast` и `virgl`.

?> Последний рекомендуется в том случае, если Вы будете запускать дистрибутив в Qemu.

Если вы хотите использовать все Gallium драйверы, используйте параметр `auto`.

### DRI

Драйверы `DRI` (не `Gallium`), доступные в x86, являются автоматическими (или альтернативными) вариантами `i915`, `i965`, `nouveau`, `r100`, `r200` и `swrast`. Используйте значение `auto` для компиляции всех доступных драйверов DRI. Либо же используйте пустую строку, если хотите собрать только Gallium:

```bash
DRI_DRIVERS=""
```

### Серверы отображения (дисплейные серверы, оконные системы и другие названия)

Серверы отображения, доступные для Linux: `Xorg`, `Wayland` и др. (в Linux for yourself поддерживаются только два перечисленных). Если ничего не указывать, система сборки `meson` скомпилирует драйверы для всех платформ, при наличии зависимостей, точно так же, как при указании флага Dplatforms=auto

### Окончательная настройка

?> Измените приведённые ниже команды по своему усмотрению. Указанные драйверы подходят для большинства видеокарт и виртуальных машин. Для получения помощи посетите [этот](https://docs.mesa3d.org/systems.html) сайт.

```bash
GALLIUM_DRV="i915,iris,nouveau,r600,radeonsi,svga,swrast,virgl"
DRI_DRIVERS="i965,nouveau"
```

!> Драйверы `nouveau` могут быть скомпилированы и для Gallium, и для DRI, драйвер `i915` может быть собран только для чего-то одного.

Сборка должна производиться в отдельном каталоге `build`:

```bash
mkdir build
cd build
```

## Настройка

```bash
meson --prefix=$XORG_PREFIX          \
      -Dbuildtype=release            \
      -Ddri-drivers=$DRI_DRIVERS     \
      -Dgallium-drivers=$GALLIUM_DRV \
      -Dgallium-nine=false           \
      -Dglx=dri                      \
      -Dosmesa=gallium               \
      -Dvalgrind=disabled            \
      -Dlibunwind=disabled           \
      ..

unset GALLIUM_DRV DRI_DRIVERS
```

## Сборка

```bash
ninja
```

## Тестирование

```bash
ninja test
```

!> Два теста из набора `llvmpipe` завершаются неудачно.

## Установка

```bash
ninja install

install -v -dm755 /usr/share/doc/mesa-21.1.1 &&
cp -rfv ../docs/* /usr/share/doc/mesa-21.1.1
```

## Объяснение новых команд

* `-Dbuildtype=release`: ключ, обеспечивающий оптимизированную сборку, отключающий отладочные утверждения, которые в некоторых случаях замедляют работу библиотек. Так же, без этого ключа размеры сборки могут достигать 2 Гб.
* `-Ddri-drivers="..."`: определяет, какие драйверы (не Gallium) должны быть собраны.
* `-Dgallium-drivers="..."`: определяет, какие драйверы (Gallium3D) должны быть собраны.
* `-Dgallium-nine=false`: предотвращение создания поддержки игр, разработанных для DX6 (Windows). Если поддержка требуется, установите значение `true`.
* `-Dosmesa=gallium`: создаёт библиотеку `libOSMesa` и обеспечивает в ней поддержку Gallium3D. **ВНИМАНИЕ!** Для этого требуется драйвер `swrast` (Gallium)
* `-Dvalgrind=disabled`: отключает использование `Valgrind` в процессе сборки. Удалите этот параметр, если Valgrind у вас установлен и вы хотите проверить наличие утечек памяти.
* `-Dlibunwind=disabled`: отключает использование `libunwind`.
* `-Dbuild-tests=true`: включение тестового кода.

## Установленные файлы
* **Установленные программы:** `glxgears` и `glxinfo`
* **Установленные библиотеки:** libEGL.so, libGL.so, libGLESv1_CM.so, libGLESv2.so, libOSMesa.so, libXvMCnouveau.so, libXvMCr600.so, libgbm.so, libglapi.so, libvulkan_intel.so, libvulkan_lvp.so, libvulkan_radeon.so, and libxatracker.so
* **Установленные драйверы:** d3dadapter9.so (optional), i915_dri.so, i965_dri.so, iris_dri.so, kms_swrast_dri.so, nouveau_dri.so, nouveau_drv_video.so, nouveau_vieux_dri.so, r200_dri.so (optional), r300_dri.so (optional), r600_dri.so, r600_drv_video.so, radeon_dri.so (optional), radeonsi_dri.so, radeonsi_drv_video.so, swrast_dri.so, virtio_gpu_dri.so, vmwgfx_dri.so, libvdpau_nouveau.so, libvdpau_r300.so (optional), libvdpau_r600.so, and libvdpau_radeonsi.so
**Установленные директории:** `$XORG_PREFIX/{include/{EGL,GL,GLES,GLES2,GLES3,KHR,vulkan},lib/{dri,vdpau}}`, `$XORG_PREFIX/include/d3adapter` (опционально), `$XORG_PREFIX/lib/d3d` (опционально), `$XORG_PREFIX/share/drirc.d`, `$XORG_PREFIX/share/vulkan/icd.d`, `/usr/share/doc/mesa-20.3.4` (опционально).
