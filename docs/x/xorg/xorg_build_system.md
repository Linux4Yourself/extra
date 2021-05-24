# Сборочная система Xorg

## Префикс установки
Xorg может быть установлен в систему с альтернативным префиксом. Обычный префикс для установки - `/usr`. К сожалению, на данный момент нет стандартного альтернативного префикса, который бы приняли большинство дистрибутивов Linux.

В некоторых дистрибутивах xorg ставится в `/usr/X11`, в некоторых - в `/opt/X11`. Однако, только `/opt/*` или `/usr` соответствует рекомендациям стандарта FHS, и авторы книги Linux for yourself настоятельно советуют использовать его.

## Настройка окружения
Для установки нужного Вам префикса установки пакета, введите:

```bash
export XORG_PREFIX="ПРЕФИКС"
```

`ПРЕФИКС` замените на нужное значение, будь то `/usr`, `/usr/X11`, `/opt` и пр. Например, чтобы Xorg, Xorg Libreries и прочие пакеты установились в `/opt/X11`, выполните:

```bash
export XORG_PREFIX="/opt/X11"
```

Так как сборка большинства пакетов из состава Xorg довольно однообразна и монотонна, упростите себе жизнь, создав ещё одну переменную `$XORG_CONFIG`, которая будет использована для подстановки наиболее используемых параметров:
```bash
export XORG_CONFIG="--prefix=$XORG_PREFIX --sysconfdir=/etc \
    --localstatedir=/var --disable-static"
```

И ещё пару приготовлений:

```bash
if [ -d /etc/profile.d ]; then
	echo "/etc/profile.d is found"
else
	mkdir /etc/profile.d
fi

cat > /etc/profile.d/xorg.sh << EOF
XORG_PREFIX="$XORG_PREFIX"
XORG_CONFIG="--prefix=\$XORG_PREFIX --sysconfdir=/etc --localstatedir=/var --disable-static"
export XORG_PREFIX XORG_CONFIG
EOF
chmod 644 /etc/profile.d/xorg.sh
```

### Объяснение новых параметров
В команде создания конфига и записи в него некоей информации (`cat > /etc/profile.d/xorg.sh ...`) некоторые пользователи могут запутаться. Обратная косая черта (слеш) перед переменной `$XORG_PREFIX` стоит здесь правильно, ошибки никакой нет. Интерпретатор BASH удалит его автоматически. Однако, если вы создаёте файл `/etc/profile.d/xorg.sh` не с помощью той команды, что приведена выше, а с помощью текстового редактора, то этот символ затем вам нужно будет удалить вручную.

Если вы используете утилиту `sudo` также выполните:

```bash
cat > /etc/sudoers.d/xorg << EOF
Defaults env_keep += XORG_PREFIX
Defaults env_keep += XORG_CONFIG
EOF
```

### Предупреждение
!> Если вы используете префикс `/usr` (стандартный), то **пропустите** оставшуюся часть этого руководства и приступите к сборке пакета `util-macros`, что после этой статьи!

***
!> Если же вы выбрали альтернативный префикс, то **обязательно** добавьте `$XORG_PREFIX/bin` в переменную $PATH, `$XORG_PREFIX/lib/pkgconfig` и `$XORG_PREFIX/share/pkgconfig` в переменную `$PKG_CONFIG_PATH`. Не лишним будет и указание дополнительных путей поиска для gcc и aclocal. Выполните следующие команды от имени `root`:

```bash
cat >> /etc/profile.d/xorg.sh << "EOF"

pathappend $XORG_PREFIX/bin PATH
pathappend $XORG_PREFIX/lib/pkgconfig PKG_CONFIG_PATH
pathappend $XORG_PREFIX/share/pkgconfig PKG_CONFIG_PATH

pathappend $XORG_PREFIX/lib LIBRARY_PATH
pathappend $XORG_PREFIX/include C_INCLUDE_PATH
pathappend $XORG_PREFIX/include CPLUS_INCLUDE_PATH

ACLOCAL="aclocal -I $XORG_PREFIX/share/aclocal"

export PATH PKG_CONFIG_PATH ACLOCAL LIBRARY_PATH C_INCLUDE_PATH CPLUS_INCLUDE_PATH
EOF
```

!> ВНИМАНИЕ! Перед тем, как выполнять следующую команду, убедитесь в том, что вы правильно настроили собранную систему!

```bash
source /etc/profile.d/xorg.sh
```

После того, как вы выполните предыдущие команды, добавьте `$XORG_PREFIX/lib` в файл `/etc/ld.so.conf`. Опять же от имени `root`:

```bash
echo "$XORG_PREFIX/lib" >> /etc/ld.so.conf
```

Для multilib выполните:

```bash
echo "$XORG_PREFIX/lib32" >> /etc/ld.so.conf
```

И перенастройте `/etc/man_db.conf`:

```bash
sed "s@/usr/X11R6@$XORG_PREFIX@g" -i /etc/man_db.conf
```

?> Некоторое программное обеспечение ищет общие файлы именно в `/usr/share/X11`, а ни где иначе. Для совместимости *рекомендуется* создать символическую ссылку на нужные файлы:

```bash
ln -svf $XORG_PREFIX/share/X11 /usr/share/X11
```

?> Так же, если вы хотите собрать в будущем рабочее окружение KDE, измените параметры `cmake` так, чтобы он смог найти Xorg в вашем префиксе. Просто создайте символическую ссылку:

```bash
ln -svf $XORG_PREFIX /usr/X11R6
```

## Заключение
На этом, создание и настройка среды сборки Xorg закончена. Приступайте к сборке!
