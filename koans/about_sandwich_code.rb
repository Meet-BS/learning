require File.expand_path(File.dirname(__FILE__) + '/neo')

class AboutSandwichCode < Neo::Koan

  def count_lines(file_name)
    file = open(file_name)
    count = 0
    while file.gets
      count += 1
    end
    count
  ensure
    file.close if file
  end

  def test_counting_lines
    assert_equal 4, count_lines("example_file.txt")
  end

  # ------------------------------------------------------------------

  def find_line(file_name)
    file = open(file_name)
    while line = file.gets
      return line if line.match(/e/)
    end
  ensure
    file.close if file
  end

  def test_finding_lines
    assert_equal "test\n", find_line("example_file.txt")
  end

  # ------------------------------------------------------------------

  def file_sandwich(file_name)
    file = open(file_name)
    yield(file)
  ensure
    file.close if file
  end

  def count_lines2(file_name)
    file_sandwich(file_name) do |file|
      count = 0
      while file.gets
        count += 1
      end
      count
    end
  end

  def test_counting_lines2
    assert_equal 4, count_lines2("example_file.txt")
  end

  # ------------------------------------------------------------------

  def find_line2(file_name)
    file_sandwich(file_name) do |file|
      while line = file.gets
        return line if line.match(/e/)
      end
    end
  end

  def test_finding_lines2
    assert_equal "test\n", find_line2("example_file.txt")
  end

  # ------------------------------------------------------------------

  def count_lines3(file_name)
    open(file_name) do |file|
      count = 0
      while file.gets
        count += 1
      end
      count
    end
  end

  def test_open_handles_the_file_sandwich_when_given_a_block
    assert_equal 4, count_lines3("example_file.txt")
  end

end
