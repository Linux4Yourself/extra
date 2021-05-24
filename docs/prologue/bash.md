# Настройка интерпретатора BASH для корректной работы в среде LX4Y

После того, как базовая система из первой части книги собрана, нужно её настроить. Самое первое - настройка оболочки. Программа `/bin/bash` (оболочка по умолчанию в LX4Y) использует ряд конфигурационных файлов для своей работы. Каждый файл используется для определённого действия. Файлы в директории `/etc` предоставляют глобальные настройки, а файлы в домашнем каталоге пользователя предоставляют настройки только для того юзера, в домашнем каталоге которого находятся.

Данная инструкция предполагает, что все конфиги будут созданы в `/etc`, а не в домашних каталогах пользователей, если это не указано в заголовке или тексте рядом.

## Предназначение некоторых файлов
В данном разделе будет описано предназначение тех файлов, что будут созданы в этой части книги. Прочитайте этот раздел внимательно, дабы потом не возникало никаких недопониманий!

### Файл /etc/profile
Если вы опытный пользователь Linux (а эта книга не любит неопытных), то вы могли заметить файлы `~/.profile`, `~/.bash_profile` и ряд других. Они используются для задания элементов окружения для оболочки пользователя. Например, `umask`, а так же переменных `PS1` или `PATH`.

В случае с `/etc/profile` все очень похоже, но он используется для задания *общесистемных* переменных (и прочего) в оболочках пользователя. Иногда это тоже самое, что и в `~/.bash_profile`, но `/etc/profile` необходим для объявления первоначальных настроек для всех пользователей системы.

### Файл /etc/bashrc
В некоторых дистрибутивах можно встретить и этот файл. Почти тоже самое, что и `~/.bashrc`. Всё те же псевдонимы команд (алиасы), функции, переменные и прочее, что можно встретить в `~/.bashrc`. Но, как в случае с `/etc/profile`, этот файл так же необходим для настроек для всех пользователей системы.

## Создание нужных файлов
В этом разделе описано создание нужных конфигов. Некоторые из них помечены кратким пояснением, а так же в каждом конфиге присутствуют поясняющие комментарии. Прочтите и попытайтесь понять, для чего каждый файл и что он делает. Полный контроль над системой гарантирует её правильную и предсказуемую работу.

### /etc/profile
**Важность:** необходимый

```bash
cat > /etc/profile << "EOF"
# Begin /etc/profile
# Written for Beyond Linux From Scratch
# by James Robertson <jameswrobertson@earthlink.net>
# modifications by Dagmar d'Surreal <rivyqntzne@pbzpnfg.arg>
# modifications (2) by Michail Krasnov <linuxoid85@gmail.com> for LX4Y

# System wide environment variables and startup programs.

# System wide aliases and functions should go in /etc/bashrc.  Personal
# environment variables and startup programs should go into
# ~/.bash_profile.  Personal aliases and functions should go into
# ~/.bashrc.

# Functions to help us manage paths.  Second argument is the name of the
# path variable to be modified (default: PATH)
pathremove () {
        local IFS=':'
        local NEWPATH
        local DIR
        local PATHVARIABLE=${2:-PATH}
        for DIR in ${!PATHVARIABLE} ; do
                if [ "$DIR" != "$1" ] ; then
                  NEWPATH=${NEWPATH:+$NEWPATH:}$DIR
                fi
        done
        export $PATHVARIABLE="$NEWPATH"
}

pathprepend () {
        pathremove $1 $2
        local PATHVARIABLE=${2:-PATH}
        export $PATHVARIABLE="$1${!PATHVARIABLE:+:${!PATHVARIABLE}}"
}

pathappend () {
        pathremove $1 $2
        local PATHVARIABLE=${2:-PATH}
        export $PATHVARIABLE="${!PATHVARIABLE:+${!PATHVARIABLE}:}$1"
}

# Logging
# $1 - text
# $2 - log file
log_msg() {
	echo -e "[ `date` ] [ $1 ]\n" >> $2
}

# Print messages on screen
# $@ - echo keys, options, and text
print_msg() {
	if [[ $QUIET -eq "true" ]]; then
		echo $1 > /dev/null
	else
		echo -e $@
	fi
}

export -f pathremove pathprepend pathappend log_msg print_msg

# Set the initial path
export PATH=/bin:/usr/bin

if [ $EUID -eq 0 ] ; then
        pathappend /sbin:/usr/sbin
        unset HISTFILE
fi

# Setup some environment variables.
export HISTSIZE=1000
export HISTIGNORE="&:[bf]g:exit"

# Set some defaults for graphical systems
export XDG_DATA_DIRS=${XDG_DATA_DIRS:-/usr/share/}
export XDG_CONFIG_DIRS=${XDG_CONFIG_DIRS:-/etc/xdg/}
export XDG_RUNTIME_DIR=${XDG_RUNTIME_DIR:-/tmp/xdg-$USER}

# Setup a red prompt for root and a green one for users.
NORMAL="\[\e[0m\]"
RED="\[\e[1;31m\]"
GREEN="\[\e[1;32m\]"
if [[ $EUID == 0 ]] ; then
  PS1="$RED\u [ $NORMAL\w$RED ]# $NORMAL"
else
  PS1="$GREEN\u [ $NORMAL\w$GREEN ]\$ $NORMAL"
fi

for script in /etc/profile.d/*.sh ; do
        if [ -r $script ] ; then
                . $script
        fi
done

unset script RED GREEN NORMAL

# End /etc/profile
EOF
```

И создайте директорию `/etc/profile.d`, в котором будут расположены отдельные скрипты и сценарии:
```bash
install --directory --mode=0755 --owner=root --group=root /etc/profile.d
```

?> Переменная `PS1` (объявляется в строках 67-75 файла `/etc/profile`) определяет содержимое системного приглашения. В разных дистрибутивах оно своё. Для теста выполните: `PS1=''`. Приглашение пропало. Вернуть его можно, выполнив `source ~/.bash_profile`. В значении этой переменной можно писать текст, а так же использовать ESCAPE-последовательности, например, последовательности для управления цветом вывода.

### /etc/profile.d/bash_completion.sh
**Важность:** желательный

!> Использование этого скрипта не всем нравится, так как он добавляет **очень** много строк в среду bash и затрудняет использование `set` для проверки простых переменных. Его создание *необязательно*.

```bash
cat > /etc/profile.d/bash_completion.sh << "EOF"
# Begin /etc/profile.d/bash_completion.sh
# Import bash completion scripts

# If the bash-completion package is installed, use its configuration instead
if [ -f /usr/share/bash-completion/bash_completion ]; then

  # Check for interactive bash and that we haven't already been sourced.
  if [ -n "${BASH_VERSION-}" -a -n "${PS1-}" -a -z "${BASH_COMPLETION_VERSINFO-}" ]; then

    # Check for recent enough version of bash.
    if [ ${BASH_VERSINFO[0]} -gt 4 ] || \
       [ ${BASH_VERSINFO[0]} -eq 4 -a ${BASH_VERSINFO[1]} -ge 1 ]; then
       [ -r "${XDG_CONFIG_HOME:-$HOME/.config}/bash_completion" ] && \
            . "${XDG_CONFIG_HOME:-$HOME/.config}/bash_completion"
       if shopt -q progcomp && [ -r /usr/share/bash-completion/bash_completion ]; then
          # Source completion code.
          . /usr/share/bash-completion/bash_completion
       fi
    fi
  fi

else

  # bash-completions are not installed, use only bash completion directory
  if shopt -q progcomp; then
    for script in /etc/bash_completion.d/* ; do
      if [ -r $script ] ; then
        . $script
      fi
    done
  fi
fi

# End /etc/profile.d/bash_completion.sh
EOF
```

Самое главное. Убедитесь, что нужный каталог существует:
```bash
install --directory --mode=0755 --owner=root --group=root /etc/bash_completion.d
```

### /etc/bashrc
**Важность:** необходимый

```bash
cat > /etc/bashrc << "EOF"
# Begin /etc/bashrc
# Written for Beyond Linux From Scratch
# by James Robertson <jameswrobertson@earthlink.net>
# updated by Bruce Dubbs <bdubbs@linuxfromscratch.org>
# modified by Michail Krasnov <linuxoid85@gmail.com> for LX4Y

# System wide aliases and functions.

# System wide environment variables and startup programs should go into
# /etc/profile.  Personal environment variables and startup programs
# should go into ~/.bash_profile.  Personal aliases and functions should
# go into ~/.bashrc

# Provides colored /bin/ls and /bin/grep commands.  Used in conjunction
# with code in /etc/profile.

alias ls='ls --color=auto'
alias ll='ls -l'
alias grep='grep --color=auto'

# Provides prompt for non-login shells, specifically shells started
# in the X environment. [Review the LFS archive thread titled
# PS1 Environment Variable for a great case study behind this script
# addendum.]

NORMAL="\[\e[0m\]"
RED="\[\e[1;31m\]"
GREEN="\[\e[1;32m\]"
if [[ $EUID == 0 ]] ; then
  PS1="$RED\u [ $NORMAL\w$RED ]# $NORMAL"
else
  PS1="$GREEN\u [ $NORMAL\w$GREEN ]\$ $NORMAL"
fi

unset RED GREEN NORMAL

# End /etc/bashrc
EOF
```

### ~/.bash_profile
**Важность:** необходимый

Базовый `~/.bash_profile`, которого будет достаточно для большинства пользователей. Скопируйте его в каталог `/etc/skel`, чтобы он копировался в домашние директории всех пользователей, которых вы сделаете позже.

```bash
cat > ~/.bash_profile << "EOF"
# Begin ~/.bash_profile
# Written for Beyond Linux From Scratch
# by James Robertson <jameswrobertson@earthlink.net>
# updated by Bruce Dubbs <bdubbs@linuxfromscratch.org>
# modified by Michail Krasnov <linuxoid85@gmail.com> for LX4Y

# Personal environment variables and startup programs.

# Personal aliases and functions should go in ~/.bashrc.  System wide
# environment variables and startup programs are in /etc/profile.
# System wide aliases and functions are in /etc/bashrc.

if [ -f "$HOME/.bashrc" ] ; then
  source $HOME/.bashrc
fi

if [ -d "$HOME/bin" ] ; then
  pathprepend $HOME/bin
fi

# Having . in the PATH is dangerous
#if [ $EUID -gt 99 ]; then
#  pathappend .
#fi

# End ~/.bash_profile
EOF
```

### ~/.profile
```bash
cat > ~/.profile << "EOF"
# Begin ~/.profile
# Personal environment variables and startup programs.
# modified by Michail Krasnov <linuxoid85@gmail.com> for LX4Y

if [ -d "$HOME/bin" ] ; then
  pathprepend $HOME/bin
fi

# End ~/.profile
EOF
```
Скопируйте его в каталог `/etc/skel`, чтобы он копировался в домашние директории всех пользователей, которых вы сделаете позже.

### ~/.bashrc
**Важность:** желательный

```bash
cat > ~/.bashrc << "EOF"
# Begin ~/.bashrc
# Written for Beyond Linux From Scratch
# by James Robertson <jameswrobertson@earthlink.net>

# Personal aliases and functions.

# Personal environment variables and startup programs should go in
# ~/.bash_profile.  System wide environment variables and startup
# programs are in /etc/profile.  System wide aliases and functions are
# in /etc/bashrc.

if [ -f "/etc/bashrc" ] ; then
  source /etc/bashrc
fi


# End ~/.bashrc
EOF
```
Скопируйте его в каталог `/etc/skel`, чтобы он копировался в домашние директории всех пользователей, которых вы сделаете позже.

?> Для того, чтобы применить текущие настройки без открытия новой сессии, выполните: `source ~/.bash_profile`.

### /etc/profile.d/umask.sh
**Важность:** необходимый

Этот скрипт **очень** важен для безопасности ОС. Разрешения на запись группы по умолчанию отключены для пользователей системы, а так же когда имя пользователя и группы не совпадают.

```bash
cat > /etc/profile.d/umask.sh << "EOF"
# By default, the umask should be set.
if [ "$(id -gn)" = "$(id -un)" -a $EUID -gt 99 ] ; then
  umask 002
else
  umask 022
fi
EOF
```

### /etc/profile.d/dircolors.sh
**Важность:** необязательный

Скрипт `/etc/profile.d/dircolors.sh` используется для управления цветами имён файлов в списке каталогов. Удобно же использовать `ls --color` или нечто подобное.

```bash
cat > /etc/profile.d/dircolors.sh << "EOF"
# Setup for /bin/ls and /bin/grep to support color, the alias is in /etc/bashrc.
if [ -f "/etc/dircolors" ] ; then
        eval $(dircolors -b /etc/dircolors)
fi

if [ -f "$HOME/.dircolors" ] ; then
        eval $(dircolors -b $HOME/.dircolors)
fi

alias ls='ls --color=auto'
alias grep='grep --color=auto'
EOF
```

### /etc/profile.d/extrapaths.sh
**Важность:** желательный

Добавление некоторых *полезных* путей к `PATH`.

```bash
cat > /etc/profile.d/extrapaths.sh << "EOF"
if [ -d /usr/local/lib/pkgconfig ] ; then
        pathappend /usr/local/lib/pkgconfig PKG_CONFIG_PATH
fi
if [ -d /usr/local/bin ]; then
        pathprepend /usr/local/bin
fi
if [ -d /usr/local/sbin -a $EUID -eq 0 ]; then
        pathprepend /usr/local/sbin
fi

# Set some defaults before other applications add to these paths.
pathappend /usr/share/man  MANPATH
pathappend /usr/share/info INFOPATH
EOF
```

### /etc/profile.d/readline.sh
**Важность:** необходимый

Устанавливает конфиг `inputrc` по умолчанию. Если у пользователя нет индивидуальных настроек, он использует глобальный файл.

```bash
cat > /etc/profile.d/readline.sh << "EOF"
# Setup the INPUTRC environment variable.
if [ -z "$INPUTRC" -a ! -f "$HOME/.inputrc" ] ; then
        INPUTRC=/etc/inputrc
fi
export INPUTRC
EOF
```

### /etc/profile.d/i18n.sh
**Важность:** желательный

Устанавливает переменную среды, необходимую для поддержки Вашего родного языка. Если хотите использовать систему с английской локализацией, не создавайте этот файл.

```bash
cat > /etc/profile.d/i18n.sh << "EOF"
# Set up i18n variables
export LANG=LL_CC.CHARMAP@MODIFIERS
EOF
```

!> ВНИМАНИЕ! Замените `LL_CC.CHARMAP@MODIFIERS` на нужное значение. Например, для русского языка оно будет таким: `ru_RU.UTF-8`. О настройке локализации читайте позже.

?> Для того, чтобы просмотреть список всех локализаций, доступных в системе, выполните: `locale -a`. Если вывод не уместится на экран, то объедините эту команду в пайп с просмотрщиком less: `locale -a |less`. Теперь для прокрутки используйте клавиши "Вверх" и "Вниз" на клавиатуре, а для выхода нажмите клавишу "Q". Для поиска нужной локализации используйте `locale -a |grep 'ЛОКАЛЬ'`.

### /etc/dircolors
**Важность:** необязательный

Если вы хотите использовать `dircolors`, выполните следующее действие:
```bash
dircolors -p > /etc/dircolors
```

?> Для настройки цветов, используемых для разных типов файлов, редактируйте файл `/etc/dircolors`.
